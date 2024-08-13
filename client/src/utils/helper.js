const saveSettings = async (settings) => {
    // Simulate an API request with a delay
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate success or failure
            if (Math.random() > 0.5) {
                resolve("Settings saved successfully");
            } else {
                reject("Failed to save settings");
            }
        }, 1000);
    });
};

export { saveSettings };
