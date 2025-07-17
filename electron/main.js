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
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || app.getBuildMetadata().GOOGLE_API_KEY;

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
    const response = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ considerIp: true })
    });

    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

    const data = await response.json();
    return {
      latitude: data.location.lat,
      longitude: data.location.lng,
      accuracy: data.accuracy
    };
  } catch (error) {
    console.error('[Main] Failed to get location:', error);
    throw error;
  }
});

app.whenReady().then(() => {
  createWindow();
});
