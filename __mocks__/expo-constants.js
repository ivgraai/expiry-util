const _default = {
    manifest: {
        extra: {
            serverUrl: "https://ivgraai.ddns.net:443/v1/",
            httpTimeout: 1500,
            cache: {
                imageEvictionFrequency: "yearly",
                data: {
                    evictionFrequency: "daily"
                }
            },
            defaultCurrentPosition: {
                latitude: 47.497913,
                longitude: 19.040236
            }
        }
    }
};

export default _default;