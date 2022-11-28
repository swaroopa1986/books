import { createContext, useContext, useState } from "react";



const AppContext = createContext(null);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if(context=== undefined){
        throw new Error("Appcontext must be within appContextProvider!");
    }
    return context;
}

const AppContextProvider =({children}) => {
 const [favourites, setFavorites] = useState([]);

 const addToFavourites = (item) => {
    const oldFavourites = [...favourites];
    const newFavourites = oldFavourites.concat(item);

    setFavorites(newFavourites);
 }
const removeFromFavourites = (id) => {
    const oldFavourites = [...favourites];
    const newFavourites = oldFavourites.filter((item) => item.id !== id);
    setFavorites(newFavourites);
 }

    return(
        <AppContext.Provider value ={{favourites, addToFavourites, removeFromFavourites}}>
            {children}
        </AppContext.Provider>
    )
};
export default AppContextProvider;