const interpolate = (value, session = {}, options = {}) => {

    if(value)
    {
        var lookup

        if(!options.isEmpty())
        {
            /* if session object is empty, i.e user has not provided any details yet.
            in this case look for variables in the given string and replace them with empty string */
            if(session.isEmpty())
            {
                //First extarct all occurences of a declared variables and stores in an array
                const stringExtractor = extract(['{','}']);
                const arrayExtracted = stringExtractor(value)

                //loop through each variable and replace with empty string
                arrayExtracted.forEach(el =>
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