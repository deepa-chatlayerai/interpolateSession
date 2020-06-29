const interpolate = (value, session = {}, options = {}) => {

    if(value)
    {
        var lookup

        if(!options.isEmpty())
        {
            if(session.isEmpty())
            {
                const stringExtractor = extract(['{','}']);
                const stingVal = stringExtractor(value)
                stingVal.forEach(el =>
                    value=value.replace(options.leftDelimiter+el+options.rightDelimiter,""))

            }
            else
            {
                Object.keys(session).forEach(key => {

                    //Construct a search string with given delimiters and session object,
                    //example : "{firstname}" ,"{lastname}" ,@@firstname@@
                    lookup= options.leftDelimiter + key + options.rightDelimiter

                    if(value.includes(lookup))
                    {
                        if(session[key])
                        value=value.replace(lookup,session[key])
                    }
                })

            }


        }

       return value
    }
};

Object.prototype.isEmpty = function() {
    for(var key in this) {
        if(this.hasOwnProperty(key))
            return false;
    }
    return true;
}

function extract([beg, end]) {
    const matcher = new RegExp(`${beg}(.*?)${end}`,'gm');
    const normalise = (str) => str.slice(beg.length,end.length*-1);
    return function(str) {
        return str.match(matcher).map(normalise);
    }
}

module.exports = { interpolate }