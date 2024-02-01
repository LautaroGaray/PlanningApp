class LocalStorage{
    SaveOrClearItem = (item, itemName) =>{        
        return 0;
    }

    SaveItem = (item, itemName)=>{        
        localStorage.clear(itemName);
        localStorage.setItem(itemName, item);
        return item;
    }

    ClearItem = (itemName)=>{
        localStorage.clear(itemName);
    }
}

export default LocalStorage;