import { Table } from "react-bootstrap";

export const MatrixDisplay = ({ title, matrix, dimension, type = "values" }) => {
    const borderStyle = { borderRight: '1px solid #b0bdf0', backgroundColor: '#dbeafe', fontWeight: "600", textAlign: "center" };

    const getCellContent = (i, j) => {
        if (type === "A") return `A${i + 1}${j + 1}`;
        if (type === "L") return i === j ? '1' : i > j ? `L${i + 1}${j + 1}` : '0';
        if (type === "U") return i === j ? `U${i + 1}${j + 1}` : i < j ? `U${i + 1}${j + 1}` : '0';
        return matrix[i][j];
    };

    return (
        <div>
            <h5 style={{ textAlign: 'center', marginTop: "40px" }}>{title}</h5>
            <Table className="rounded-table">
                <thead>
                    <tr>
                        <th style={borderStyle}></th>
                        {[...Array(dimension)].map((_, index) => (
                            <th key={index}>c{index + 1}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {[...Array(dimension)].map((_, i) => (
                        <tr key={i}>
                            <td style={borderStyle}>{`r${i + 1}`}</td>
                            {[...Array(dimension)].map((_, j) => (
                                <td key={j} style={{ textAlign: 'center' }}>
                                    {getCellContent(i, j)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};