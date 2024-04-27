import { useState } from "react";
import "./App.css";
import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Select, Slider, Switch, TextField, Typography } from "@mui/material";
import QRCode from "qrcode.react";
import { MuiColorInput } from "mui-color-input";
import { Save } from "@mui/icons-material";
import english from "./lang/english";
import portuguese from "./lang/portuguese";

type Levels = 'L' | 'M' | 'Q' | 'H';

const languages = {
    english: english,
    portuguese: portuguese,
}

function App() {
    const [url, setUrl] = useState<string>("");
    const [bgColor, setBgColor] = useState<string>("#fff");
    const [fgColor, setFgColor] = useState<string>("#000");
    const [margin, setMargin] = useState<boolean>(false);
    const [image, setImage] = useState<string>("");
    const [imageHeight, setImageHeight] = useState<number>(50);
    const [imageWidth, setImageWidth] = useState<number>(50);
    const [imageExcavate, setImageExcavate] = useState<boolean>(true);
    const [printSize, setPrintSize] = useState<number>(1000);
    const [level, setLevel] = useState<Levels>('L');
    const [name, setName] = useState<string>("qrcode");
    const [language, setLanguage] = useState<keyof typeof languages>('english');

    return (
        <Box className="container" p={3}>
            <Box display="flex" alignItems={'center'} justifyContent="space-between">

                <Typography variant="h4">QR Code Generator</Typography>
                <FormControl margin="normal" variant="outlined">
                    <InputLabel style={{ color: 'white' }}>{languages[language].language}</InputLabel>
                    <Select
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value as keyof typeof languages);
                        }}
                        label="Idioma"
                        style={{ color: 'white' }}
                    >
                        <MenuItem value="english">English</MenuItem>
                        <MenuItem value="portuguese">Português</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={2} mt={2}>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label={languages[language].text}
                        variant="outlined"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        margin="normal"
                        InputLabelProps={{
                            style: { color: "#fff" },
                        }}
                        style={{ color: "#fff" }}
                        inputProps={{ style: { color: "#fff" } }}
                    />
                    <Grid container spacing={2} justifyContent="center" alignItems="center">
                        <Grid item xs={6}>
                            <MuiColorInput
                                value={bgColor}
                                onChange={setBgColor}
                                label={languages[language].background_color}
                                margin="normal"
                                InputLabelProps={{
                                    style: { color: "#fff" },
                                }}
                                style={{ color: "#fff" }}
                                inputProps={{ style: { color: "#fff" } }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <MuiColorInput
                                value={fgColor}
                                onChange={setFgColor}
                                label={languages[language].foreground_color}
                                margin="normal"
                                InputLabelProps={{
                                    style: { color: "#fff" },
                                }}
                                style={{ color: "#fff" }}
                                inputProps={{ style: { color: "#fff" } }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                label={languages[language].print_size}
                                variant="outlined"
                                value={printSize}
                                onChange={(e) => setPrintSize(Number(e.target.value))}
                                margin="normal"
                                type="number"
                                InputLabelProps={{
                                    style: { color: "#fff" },
                                }}
                                style={{ color: "#fff" }}
                                inputProps={{ style: { color: "#fff" } }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FormControlLabel
                                control={<Switch checked={margin} onChange={(e) => setMargin(e.target.checked)} />}
                                label={languages[language].has_margin}
                                style={{ color: "#fff" }}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        fullWidth
                        label={languages[language].symbol}
                        variant="outlined"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            if (e.target?.files?.[0]) {
                                setImage(URL.createObjectURL(e.target.files[0]));
                            }
                        }}
                        type="file"
                        margin="normal"
                        InputLabelProps={{
                            style: { color: "#fff" },
                            shrink: true,
                        }}
                        style={{ color: "#fff" }}
                        inputProps={{ style: { color: "#fff" }, accept: "image/*" }}
                    />

                    <FormControlLabel
                        control={<Switch checked={imageExcavate} onChange={(e) => setImageExcavate(e.target.checked)} />}
                        label={languages[language].space}
                        style={{ color: "#fff" }}
                        disabled={!image}
                    />
                    <div>
                        <FormLabel style={{ color: 'white' }}>{languages[language].symbol_height}</FormLabel>
                        <Slider
                            value={imageHeight}
                            onChange={(_, value) => setImageHeight(value as number)}
                            min={0}
                            max={100}
                            disabled={!image}
                        />
                        <FormLabel style={{ color: 'white' }}>{languages[language].symbol_width}</FormLabel>
                        <Slider
                            value={imageWidth}
                            onChange={(_, value) => setImageWidth(value as number)}
                            min={0}
                            max={100}
                            disabled={!image}
                        />
                    </div>
                    <FormControl fullWidth margin="normal" variant="outlined">
                        <InputLabel style={{ color: 'white' }}>{languages[language].error_correction}</InputLabel>
                        <Select
                            value={level}
                            onChange={(e) => setLevel(e.target.value as Levels)}
                            label="Nível de Correção de Erro"
                            style={{ color: 'white' }}
                        >
                            <MenuItem value="L">{languages[language].error_correction_L}</MenuItem>
                            <MenuItem value="M">{languages[language].error_correction_M}</MenuItem>
                            <MenuItem value="Q">{languages[language].error_correction_Q}</MenuItem>
                            <MenuItem value="H">{languages[language].error_correction_H}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <Box mb={3} p={3} bgcolor={"#dadada"} borderRadius={5}>
                        <QRCode
                            value={url}
                            size={300}
                            bgColor={bgColor}
                            fgColor={fgColor}
                            includeMargin={margin}
                            level={level}
                            imageSettings={{
                                src: image,
                                height: imageHeight,
                                width: imageWidth,
                                excavate: imageExcavate,
                            }}
                        />
                        <QRCode
                            id="print"
                            value={url}
                            size={printSize}
                            bgColor={bgColor}
                            fgColor={fgColor}
                            includeMargin={margin}
                            imageSettings={{
                                src: image,
                                height: imageHeight,
                                width: imageWidth,
                                excavate: imageExcavate,
                            }}
                            style={{ display: "none" }}
                        />
                    </Box>
                    <TextField
                        fullWidth
                        label={languages[language].file_name}
                        variant="outlined"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        InputLabelProps={{
                            style: { color: "#fff" },
                        }}
                        style={{ color: "#fff" }}
                        inputProps={{ style: { color: "#fff" } }}
                    />
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Save />}
                        onClick={() => {
                            let canvas = document.getElementById("print") as HTMLCanvasElement;
                            if (canvas) {
                                const link = document.createElement("a");
                                link.download = `${name}.png`;
                                link.href = canvas.toDataURL("image/png");
                                link.click();
                            }
                        }}
                    >
                        {languages[language].save}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default App;
