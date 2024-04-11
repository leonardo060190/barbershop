import { Card, CardFooter } from "../ui/card"


const footer = () => {
  return (
    <div>
        <Card>
            <CardFooter className="flex justify-center">
                <p><span>Controle de Tarefas</span> &copy; 2023</p>
            </CardFooter>
        </Card>
    </div>
  )
}

export default footer