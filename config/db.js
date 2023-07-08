function getMongoDatabaseUrls() {
    let mongoMainUrl;
    const mongoMainHosts = eval(mongoMainHost);
        mongoMainUrl = `mongodb+srv://${mongoMainUser}:${mongoMainPass}@${mongoMainHosts.join()}/${mongoMainDB}?retryWrites=true&w=majority`;
    return { mongoMainUrl };
}

let { mongoMainUrl } = getMongoDatabaseUrls();
module.exports = {
    mongoMainUrl: mongoMainUrl
};