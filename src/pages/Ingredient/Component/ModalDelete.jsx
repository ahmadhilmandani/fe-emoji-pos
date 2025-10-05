import { IconInfoTriangleFilled, IconTrash, IconTrashFilled } from "@tabler/icons-react"
import Modal from "../../../components/Modal"
import Button from "../../../components/Button"
import { useState } from "react"
import { toast } from "react-toastify"
import { softDeleteIngredient } from "../../../api/softDeleteIngredient"


export default function IngredientModalDelete({ handleCloseModal, ingredientData, isRefetch }) {
  const [isLoading, setIsLoading] = useState(false)
  
  const handleSoftDelete = async () => {
      setIsLoading(true)
      try {
        await softDeleteIngredient(ingredientData.id)
        toast.success("Berhasil Menghapus Bahan Baku")
        handleCloseModal()
        isRefetch(true)
      } catch (error) {
        toast.error(error.response.data.msg)
      } finally {
        setIsLoading(false)
      }
  }
  
  return (
    <Modal>
      <div className="p-4 w-full max-w-[100px] aspect-square rounded-full flex justify-center items-center bg-rose-500 border-8 border-rose-100 mx-auto mb-8">
        <IconInfoTriangleFilled size={'80%'} className="fill-white" />
      </div>

      
      <h2 className="text-center mb-3">Anda Yakin?</h2>
      <div className="text-center text-gray-500/70 mb-12">
        Mmenghapus bahan baku <strong>{ingredientData.name}</strong> tidak dapat diulang
      </div>

      <div className="flex justify-center items-center gap-8 flex-wrap max-w-xl mx-auto">
        <div className="min-w-[100px] flex-1">
          <Button onClickProp={handleCloseModal} isExtend={true} buttonType="default">Batal</Button>
        </div>
        <div className="min-w-[100px] flex-1">
          <Button onClickProp={handleSoftDelete} isLoading={isLoading} isExtend={true} buttonType="danger">Iya</Button>
        </div>

      </div>

    </Modal>
  )
}