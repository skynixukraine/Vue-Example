const configLS = {
    localName:          'front-hautarzt',  // name localStorage
    lifeLocalStorage:   1                  // life localStorage, day
};
export default {
    data() {
        return {
            email: '',
        }
    },
    mounted() { /** Add data to Vue data**/

        for(var i=0; i < localStorage.length; i++){
            let keyword = localStorage.key(i);

            if (keyword === configLS.localName) {
                let data = JSON.parse(localStorage.getItem(keyword));

                for(let prop in data){
                    if(prop === 'date'){continue;}
                    this[prop] = data[prop];
                }
            }
        }
    },
    methods : {
        setObjLocalStorage(newObj) {  /**to write JSON to the localStorage**/
            if (!newObj || typeof(newObj) != "object") {
                return false;
            }
            let _newObj = Object.assign(newObj, this._addDate()),
                data = localStorage.getItem(configLS.localName) ? JSON.parse(localStorage.getItem(configLS.localName)) : false,
                obj = data ? Object.assign(data, _newObj) : _newObj;

            for(let prop in newObj){
                this[prop] = newObj[prop];
            }
            localStorage.setItem(configLS.localName, JSON.stringify(obj));
        },

        getPropLocalStorage(prop) {  /** to read the property values from a localStorage**/

            let data = localStorage.getItem(configLS.localName) ? JSON.parse(localStorage.getItem(configLS.localName)) : false;
            if(this._checkDate(data)){

                if (data && data.hasOwnProperty(prop)) {
                    return data[prop];
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        _addDate() {  /** sets shelf life localStorage**/
            let D = new Date();
            return {'date': D.setDate(D.getDate() + configLS.lifeLocalStorage)};
        },
        _checkDate(data){ /** Delete localStorage lifetime that has expired**/
            let setDate = data ? data['date'] : false;

            if (setDate && setDate < new Date()) {
                localStorage.removeItem(configLS.localName);
                setDate = null;
                return false;
            } else {
                return true;
            }
        }
    }

}