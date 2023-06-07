import { ButtonItems } from "../../../styles/buttons";
import { LiStyled } from "./styled";
import ModalDelete from "../../modals/modalDelete";
import { useState, useContext } from "react";
import { iProducts } from "../../../contexts/products/@types";
import { ProductsContext } from "../../../contexts/products";
import ModalEdit from "../../modals/modalEdit";

interface iProductProps {
   product: iProducts;
}
const ProductItems = ({ product }: iProductProps) => {
   const { deleteProducts} = useContext(ProductsContext);

   const [opemModal, setOpemModal] = useState(false);
   const [opemModalEdit, setOpemModalEdit] = useState(false);

   const {
      id,
      price_product,
      sku_product,
      title_product,
      stock_product,
      createdAt,
   } = product;

   return (
      <>
         <LiStyled className="collection-item grey lighten-3">
            <div>
               <p>
                  <span>Produto: </span>
                  {title_product}
               </p>
               <p>
                  <span>SKU: </span>
                  {sku_product}
               </p>
               <p>
                  <span>Preço: </span>
                  {price_product}
               </p>
               <p>
                  <span>Estoque: </span>
                  {stock_product}
               </p>
               <p>
                  <span>Data de cadastro: </span>
                  {createdAt}
               </p>
            </div>
            <button>
               <i
                  className="material-icons"
                  onClick={() => setOpemModal(!opemModal)}
               >
                  delete_forever
               </i>
            </button>
            <button>
               <i
                  className="material-icons icon__edit"
                  onClick={() => setOpemModalEdit(!opemModalEdit)}
               >
                  edit
               </i>
            </button>
            <ButtonItems>Mais infomações</ButtonItems>
         </LiStyled>

         {opemModal && (
            <ModalDelete
               opemModal={opemModal}
               setOpemModal={setOpemModal}
               id={id}
               requestDelete={deleteProducts}
            />
         )}

         {opemModalEdit && (
            <ModalEdit
               opemModalEdit={opemModalEdit}
               setOpemModalEdit={setOpemModalEdit}
               id={id}
            />
         )}
      </>
   );
};

export default ProductItems;
