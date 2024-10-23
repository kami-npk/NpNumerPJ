import { Table } from "react-bootstrap";

export const YTable = ({ dimension, solutionSteps }) => {
    const borderStyle = { borderRight: '1px solid #b0bdf0', backgroundColor: '#dbeafe', fontWeight: "600", textAlign: "center" };

    return (
        <Table className="rounded-table">
            <thead>
                <tr>
                    <th style={borderStyle}>Y<sub>i</sub></th>
                    <th style={borderStyle}>Value</th>
                </tr>
            </thead>
            <tbody>
                {[...Array(dimension)].map((_, i) => (
                    <tr key={i}>
                        <td style={borderStyle}>{`Y${i + 1}`}</td>
                        <td style={{ textAlign: 'center' }}>
                            {solutionSteps.find(step => step.description === `Solving for Y${i + 1}`)?.step || '0'}
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};