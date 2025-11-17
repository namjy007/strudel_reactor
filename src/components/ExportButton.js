// src/components/ExportButton.js
// Here the button is found in control panel and exports the current settings into json which can later be exported. currently i dont have a working file picker but yh i will work on it in my next commit.
// the json because ser’s instrument settings, effects, and Strudel code can be saved in a structured, portable format that is easy to store, share, and later re-import to restore the exact state of the editor.
export default function ExportButton() {
    const handleExport = () => {
        const procText = document.getElementById("proc")?.value || "";
        const exportData = {
            procText,
            volumes: window.instrumentVolumes || { Bassline: 1, "Main Arp": 1, Drums: 1, Drums2: 1 },
            echoes: window.instrumentEchoes || { Bassline: 0, "Main Arp": 0, Drums: 0, Drums2: 0 },
        };

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "strudel-tune.json";
        a.click();

        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleExport}
            className="btn btn-success"
            style={{ width: "180px", height: "50px", borderRadius: "12px" }}
        >
            Export Tune
        </button>
    );
}
