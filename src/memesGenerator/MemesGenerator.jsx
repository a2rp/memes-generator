import React, { useState } from "react"
import styles from "./styles.module.scss";
import { Button, CircularProgress, TextField } from "@mui/material";
import axios from "axios";
import { toPng } from "html-to-image";

const MemesGenerator = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [topText, setTopText] = useState("");
    const [bottomText, setBottomText] = useState("");
    const [memes, setMemes] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const options = {
                url: "https://api.imgflip.com/get_memes",
                method: "GET"
            };
            setIsLoading(true);
            setMemes(null);
            const response = await axios(options);
            console.log(response, "response");
            setMemes(response.data.data.memes);
        } catch (error) {
            console.log(error, "error");
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const saveImage = (imageNumber) => {
        toPng(document.querySelector(".meme" + imageNumber), { cacheBust: true, }).then((dataUrl) => {
            const link = document.createElement("a");
            link.download = "meme.png";
            link.href = dataUrl;
            link.click();
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.topSection}>
                    <div className={styles.heading}>Memes Generator</div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <TextField
                            value={topText}
                            onChange={event => setTopText(event.target.value)}
                            label="Top text"
                            placeholder="Write top text here"
                            fullWidth
                            className={styles.topText}
                        />
                        <TextField
                            value={bottomText}
                            onChange={event => setBottomText(event.target.value)}
                            label="Bottom text"
                            placeholder="Write bottom text here"
                            fullWidth
                            className={styles.bottomText}
                        />
                        <Button
                            type="submit"
                            disabled={isLoading}
                            variant="contained"
                            className={styles.submitButton}
                            fullWidth
                        >{isLoading
                            ? <CircularProgress sx={{ padding: "10px" }} />
                            : "Get meme images"}</Button>
                    </form>
                </div>

                <div className={styles.outputContainer}>
                    {memes != null
                        && <>
                            {memes.map((item, index) => (
                                <div key={index} className={`${styles.memesContainer} meme${index}`}>
                                    {/* <div className={styles.memeName}>{item.name}</div> */}
                                    <img src={item.url} className={styles.memeImage} alt="" />
                                    <div className={styles.memeTopText}>{topText}</div>
                                    <div className={styles.memeBottomText}>{bottomText}</div>
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        onClick={() => saveImage(index)}
                                        className={styles.saveButton}
                                    >Save</Button>
                                </div>
                            ))}
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default MemesGenerator

