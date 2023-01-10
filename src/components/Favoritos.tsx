import { Pencil, Star, X } from "phosphor-react"

export function Favoritos({favorites, handleDeleteContact}:any){
  return(
    <div className="favorites">
          <h2><span><Star size={25} weight='bold' /></span>Favoritos</h2>

          {favorites.map((favorite) => {
            return(
              <div className='favorite' key={favorite.id}>
                <div className="favorite-user">
                  <img src="https://github.com/CarolMaiaP.png" alt="foto do usuario" />
                  <h3>{favorite.pessoa.nome}</h3>
                </div>
                <h4>{favorite.id}</h4>
                <div className="actions">
                  <button onClick={() => handleDeleteContact(favorite)}><X size={27} /></button>
                </div>
              </div>
            )
          })}
        </div>
  )
}