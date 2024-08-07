/** FETCHER */
function Fetcher(url, options, body) {
    return fetch(url, this.fetchOptions(options, body));
}

Fetcher.prototype.fetchOptions = function (options, body) {
    /* setup default headers and parse of body for FA */
    const update = { ...options };
    update.headers = {
        ...update.headers,
        "Content-Type": "application/x-www-form-urlencoded",
    };
    update.body = this.bodyData(body);
    return update;
};

Fetcher.prototype.toFormData = function (obj) {
    var form_data = new FormData();

    for (var key in obj) {
        form_data.append(key, obj[key]);
    }
    return form_data;
};

Fetcher.prototype.encodeFormData = function (data) {
    return [...data.entries()]
        .map((x) => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
        .join("&");
};

Fetcher.prototype.bodyData = function (obj) {
    // compatible data for FA with fetch
    return this.encodeFormData(this.toFormData(obj));
};

export { Fetcher };
