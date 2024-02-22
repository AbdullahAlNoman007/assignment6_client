import { Button } from "antd";
import jsPDF from "jspdf";
import { useLocation, useNavigate } from "react-router-dom";

const InVoice = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { buyerName, quantity, saleDate } = location.state;
    const generate = async () => {
        const doc = new jsPDF();
        doc.text(`Buyer Name: ${buyerName}`, 10, 10);
        doc.text(`Quantity: ${quantity}`, 10, 20);
        doc.text(`Sale Date: ${saleDate}`, 10, 30);
        doc.save('invoice.pdf')
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ border: '1px solid #1111', borderRadius: '10px', padding: '20px', backgroundColor: "#FAF9F6", width: '400px' }}>
                <p style={{ fontSize: '20px', fontWeight: '400', marginBottom: '10px' }}>Buyer Name: {buyerName}</p>
                <p style={{ fontSize: '20px', fontWeight: '400', marginBottom: '10px' }}>Quantity: {quantity}</p>
                <p style={{ fontSize: '20px', fontWeight: '400', marginBottom: '10px' }}>Sale Date: {saleDate}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '15px' }}>
                <Button onClick={generate}>Download</Button>
                <Button onClick={() => navigate('/')}>Skip</Button>
            </div>
        </div>
    );
};

export default InVoice;