import { app, BrowserWindow, screen, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: app.isPackaged
    ? path.join(process.resourcesPath, ".env")
    : path.join(__dirname, "../.env")
});
const API_KEY = process.env.IPGEOLOCATION_API_KEY;

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: 300,
    height: 300,
    x: width - 320,
    y: height - 320,
    frame: false,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, "../dist/index.html"));
}

ipcMain.handle('get-location', async () => {
  try {
    const response = await fetch(`https://api.ipgeolocation.io/v2/ipgeo?apiKey=${API_KEY}`, {
      method: 'GET',
      redirect: "follow"
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    return {
      latitude: Number(data.location.latitude),
      longitude: Number(data.location.longitude)
    };
  } catch (error) {
    console.error('[Main] Failed to get location:', error);
    throw error;
  }
});

app.whenReady().then(() => {
  createWindow();
});
