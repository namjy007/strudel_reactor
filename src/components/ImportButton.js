// src/components/ImportButton.js
import { Proc } from "../App";
// import buttons in the control panel lets the user import thejson file and the editor reads the values from that file.
export default function ImportButton() {
    const handleImport = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const text = await file.text();
        try {
            const data = JSON.parse(text);

            // Restore textarea
            if (data.procText) {
                document.getElementById("proc").value = data.procText;
            }

            // Restore volumes and echoes
            if (data.volumes) window.instrumentVolumes = data.volumes;
            if (data.echoes) window.instrumentEchoes = data.echoes;

            // Apply the tune
            Proc();
        } catch (err) {
            alert("Invalid file format!");
            console.error(err);
        }
    };

    return (
        <label className="btn btn-primary" style={{ width: "180px", height: "50px", borderRadius: "12px", display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            Import Tune
            <input
                type="file"
                accept=".json"
                onChange={handleImport}
                style={{ display: "none" }}
            />
        </label>
    );
}
