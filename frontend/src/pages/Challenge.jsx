import Button from "../elements/Button"

const AddChallenge = () =>{
    return (
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl">
            Add a new challenge
            </h1>
            <form submit={handleSubmit} className="mt-10 max-w-96 flex flex-col gap-8">
                <Button type="submit" className="">
                    
                </Button>

            </form>
        </div>
    )
}
export default AddChallenge