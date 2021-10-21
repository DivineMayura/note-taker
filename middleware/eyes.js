// This logs out the type and the path of each reqest to the server
const eyes = (req, res, next) => {
    const fgCyan = `\x1b[36m`;
    switch (req.method) {
        case "get": {
            console.info(`📗 ${fgCyan}${req.method} request to ${req.path}`);
            break;
        }
        case 'POST': {
            console.info(`📘 ${fgCyan}${req.method} request to ${req.path}`);
            break;
        }
        default:
            console.log(`📙${fgCyan}${req.method} request to ${req.path}`);
    }

    next();
};

exports.eyes = eyes;
