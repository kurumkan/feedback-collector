const keys = require('../../config/keys');
module.exports = (servey) => {
  return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>Please answer the question</h3>
                <p>
                    ${servey.body}
                </p>
                <div>
                    <a href="${keys.redirectDomain}/api/serveys/${servey.id}/yes">Yes</a>
                </div>
                 <div>
                    <a href="${keys.redirectDomain}/api/serveys/${servey.id}/no">No</a>
                </div>
            </div>
        </body>
    </html>  
  `;
};
