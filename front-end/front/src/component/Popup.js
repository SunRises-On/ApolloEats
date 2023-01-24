import { Modal,Button } from "react-bootstrap";

export default function Popup({rest, id, onHide, show}){
    
    console.log(" rest.name : " + rest.name);
    console.log("Popup");
    //let name = rest.name;
    //console.log(name);
    //also props for card.name
    //restaurant to do database call
    return(
        <>
            {/* <div 
            onClick={()=>setIsOpen(false)}
            /> */}

            <div>
                <Modal
                    size="lg"
                    centered
                    show={show} 
                    onHide={onHide} 
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {rest.name}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Menu</h4>
                        <p>
                            Body
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </>
    );
}