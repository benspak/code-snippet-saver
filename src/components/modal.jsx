import "./modal.css"

export const Modal = (props) => {
    const {children, onClose} = props;
    return (
        <div id="myModal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <button className="btn-close" onClick={onClose}>X</button>
                    <h2>Modal Header</h2>
                </div>
                <div class="modal-body">
                    {children}
                </div>
                    <div class="modal-footer">
                    <h3>Modal Footer</h3>
                </div>
            </div>
        </div>
    )
}