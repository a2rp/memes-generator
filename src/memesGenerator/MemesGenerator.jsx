import { useState } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import { FiDownload, FiImage, FiRefreshCw } from "react-icons/fi";
import axios from "axios";
import { toPng } from "html-to-image";
import { toast } from "react-toastify";
import styles from "./styles.module.scss";

function MemesGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [memes, setMemes] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMemes(null);

    try {
      const response = await axios.get("https://api.imgflip.com/get_memes");
      setMemes(response.data.data.memes);
    } catch (error) {
      toast.error(error.message || "Unable to load meme templates.");
    } finally {
      setIsLoading(false);
    }
  };

  const saveImage = (imageNumber) => {
    const memeElement = document.querySelector(`.meme-visual-${imageNumber}`);
    if (!memeElement) return;

    toPng(memeElement, { cacheBust: true, pixelRatio: 2 })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `meme-${imageNumber + 1}.png`;
        link.href = dataUrl;
        link.click();
        toast.success("Meme saved as PNG.");
      })
      .catch((error) => toast.error(error.message || "Unable to save this meme."));
  };

  return (
    <section id="generator" className={styles.container} aria-labelledby="generator-title">
      <div className={styles.main}>
        <div className={styles.formCard}>
          <div className={styles.cardHeading}>
            <div><p className={styles.eyebrow}>Template studio</p><h2 id="generator-title">Add your message</h2></div>
            <FiImage aria-hidden="true" />
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <TextField value={topText} onChange={(event) => setTopText(event.target.value)} label="Top text" placeholder="Write top text here" fullWidth />
            <TextField value={bottomText} onChange={(event) => setBottomText(event.target.value)} label="Bottom text" placeholder="Write bottom text here" fullWidth />
            <Button type="submit" disabled={isLoading} variant="contained" className={styles.submitButton} startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <FiRefreshCw />}>
              {isLoading ? "Loading templates" : "Get meme images"}
            </Button>
          </form>
          <p className={styles.helperText}>Your text stays in this browser until you save an image.</p>
        </div>

        <div className={styles.outputHeader}>
          <div><p className={styles.eyebrow}>Template results</p><h2>Pick a canvas and save it.</h2></div>
          {memes && <span>{memes.length} templates</span>}
        </div>

        {memes ? (
          <div className={styles.outputContainer}>
            {memes.map((item, index) => (
              <article key={item.id || index} className={styles.memeCard}>
                <div className={`${styles.memeVisual} meme-visual-${index}`}>
                  <img src={item.url} className={styles.memeImage} alt={item.name} />
                  <div className={styles.memeTopText}>{topText}</div>
                  <div className={styles.memeBottomText}>{bottomText}</div>
                </div>
                <div className={styles.cardFooter}><span>{item.name}</span><Button variant="outlined" onClick={() => saveImage(index)} startIcon={<FiDownload />} aria-label={`Save ${item.name}`}>Save</Button></div>
              </article>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}><FiImage aria-hidden="true" /><h3>Your templates will appear here.</h3><p>Enter text if you like, then load the latest public templates.</p></div>
        )}
      </div>
    </section>
  );
}

export default MemesGenerator;