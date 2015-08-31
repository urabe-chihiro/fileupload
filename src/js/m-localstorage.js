var mLocalStorage = {
    storage: localStorage,
    setData: function(_id,_data){
        var _setData = ($.isPlainObject(_data)) ? JSON.stringify(_data) : _data;
        this.storage.setItem(_id,_setData);
        //console.log(this.storage.getItem(_id));
    },
    getData: function(_id){
        return this.storage.getItem(_id);
    },
    removeData: function(_id){
        this.storage.remove(_id);
        //console.log(this.storage.getITem(_id));
    }
};

module.exports = mLocalStorage;

