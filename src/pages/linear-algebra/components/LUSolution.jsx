import { Row, Col } from "react-bootstrap";
import { MatrixDisplay } from "./MatrixDisplay";
import { YTable } from "./YTable";

export const LUSolution = ({ dimension, matrixL, matrixU, solutionSteps, printAnswer }) => {
    return (
        <div>
            <h5 style={{ textAlign: 'center' }}>From Ax = B</h5>
            <h5 style={{ textAlign: 'center' }}>Decompose A to LU</h5>
            
            <Row>
                <Col>
                    <MatrixDisplay title="Matrix A" dimension={dimension} matrix={[]} type="A" />
                </Col>
                <Col>
                    <MatrixDisplay title="Matrix L" dimension={dimension} matrix={[]} type="L" />
                </Col>
                <Col>
                    <MatrixDisplay title="Matrix U" dimension={dimension} matrix={[]} type="U" />
                </Col>
            </Row>

            <Row style={{ marginTop: "40px" }}>
                <Col md={6}>
                    <MatrixDisplay title="Matrix L (Values)" dimension={dimension} matrix={matrixL} />
                </Col>
                <Col md={6}>
                    <MatrixDisplay title="Matrix U (Values)" dimension={dimension} matrix={matrixU} />
                </Col>
            </Row>
            
            <div style={{ marginTop: "40px" }}>
                <h5 style={{ textAlign: 'center' }}>From LUx = B, let Ux = Y</h5>
                <h5 style={{ textAlign: 'center' }}>Find Y from LY = B</h5>
                <YTable dimension={dimension} solutionSteps={solutionSteps} />

                <h5 style={{ textAlign: 'center', marginTop: "20px" }}>Find X from Ux = Y</h5>
                <h5 style={{ textAlign: 'center', marginTop: '20px' }}>{printAnswer()}</h5>
            </div>
        </div>
    );
};