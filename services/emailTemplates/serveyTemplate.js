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
                    <a href="${keys.redirectDomain}/api/serveys/thanks">Yes</a>
                </div>
                 <div>
                    <a href="${keys.redirectDomain}/api/serveys/thanks">No</a>
                </div>
            </div>
        </body>
    </html>  
  `;
};