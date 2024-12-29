import React, {useEffect, useState} from "react";
import '../styles/table.css'
import '@fortawesome/fontawesome-free/css/all.css';
import Loader from '../assets/loader.svg'


function Table () {

    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [originalData, setOriginalData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [openRows, setOpenRows] = useState({})
    

    const [sortStates, setSortStates] = useState ({
        firstname: "default",
        surname: "default",
        sex: "default",
        birthdate: "default"
    })

useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null); 
            const responce = await fetch("https://proovitoo.twn.ee/api/list");
            if (!responce.ok) {
                throw new Error("Midagi läks valesti");
            }
            const result = await responce.json();
            setData(result.list);
            setOriginalData(result.list);
            setFilteredData(result.list);
        } catch (err) {
            setError(err.message); 
        } finally {
            setLoading(false);
        }
    };
    fetchData();
}, []);

    if (loading) return <div style={{height:"100vh"}}><img style={{width: "100%", height:"100px"}} src={Loader}/></div> 
    if (error) return <div style={{height:"100vh"}}><h1 style={{width: "100%", textAlign:"center", fontFamily:"BoosterNextFY, sans-serif", color:"white"}}>Midagi läks valesti...</h1></div>

    const sortByField = (field) => {
        let sortedData = [...filteredData];
        const currentOrder = sortStates[field];

        const resetSortStates = Object.keys(sortStates).reduce((acc, key) => {
            acc[key] = key === field ? currentOrder : "default"
            return acc
        }, {})
    
        if (currentOrder === "default") {
            sortedData.sort((a, b) => {
                if (field === "birthdate") {
                    return new Date(getBirthdateForSorting(a.personal_code)) - new Date(getBirthdateForSorting(b.personal_code));
                }
                if (field === "sex") {
                    return getGender(a.personal_code).localeCompare(getGender(b.personal_code))
                }
                const valA = a[field] || "";
                const valB = b[field] || "";
                return valA.localeCompare(valB);
            });
            setSortStates({ ...resetSortStates, [field]: "ascending" });
        } else if (currentOrder === "ascending") {
            sortedData.sort((a, b) => {
                if (field === "birthdate") {
                    return new Date(getBirthdateForSorting(b.personal_code)) - new Date(getBirthdateForSorting(a.personal_code));
                }
                if (field === "sex") {
                    return getGender(b.personal_code).localeCompare(getGender(a.personal_code))
                }
                const valA = a[field] || "";
                const valB = b[field] || "";
                return valB.localeCompare(valA);
            });
            setSortStates({ ...resetSortStates, [field]: "descending" });
        } else {
            sortedData = [...originalData];
            setSortStates({ ...resetSortStates, [field]: "default" });
        }
        setFilteredData(sortedData);
    };
    
    const rowsPerPage = 10
    const maxPageButtons = 5
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow)

    const getPageRange = () => {
        const totalPages = Math.ceil(data.length / rowsPerPage)
        const start = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1)
        const end = Math.min(start + maxPageButtons - 1, totalPages)
        return Array.from({length: end - start + 1}, (_, i) => start + i)
    }

    const toggleRow = (id) => {
        setOpenRows((prev) => ({
            [id]: !prev[id] 
        }));
    };

    const getBirthdateForSorting = (personalCode) => {
        if (!personalCode) return new Date(0); 
        const code = String(personalCode);
        const firstDigit = parseInt(code[0], 10);
        const century = firstDigit <= 2 ? 1800 : firstDigit <= 4 ? 1900 : 2000;
        const year = century + parseInt(code.substring(1, 3), 10);
        const month = parseInt(code.substring(3, 5), 10) - 1;
        const day = parseInt(code.substring(5, 7), 10);
        return new Date(year, month, day);
    };
    

    const getBirthdate = (personalCode) => {
        if (!personalCode) return ""; 
        const code = String(personalCode);
        const firstDigit = parseInt(code[0], 10);
        const century = firstDigit <= 2 ? 1800 : firstDigit <= 4 ? 1900 : 2000;
        const year = century + parseInt(code.substring(1, 3), 10);
        const month = String(parseInt(code.substring(3, 5), 10)).padStart(2, "0");
        const day = String(parseInt(code.substring(5, 7), 10)).padStart(2, "0");
        return `${day}.${month}.${year}`;
    };
    

    const getGender = (personalCode) => {
        const firstDigit = parseInt(String(personalCode) [0], 10)
        return firstDigit % 2 === 0 ? "Naine" : "Mees"
    }

    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber.startsWith("+372")) return phoneNumber;
        return phoneNumber.slice(0, 4) + " " + phoneNumber.slice(4)
    }
        



    return(
        <div style={{height:"100vh"}}>
        <div className="table-h1">
            <h1 className="h1-t">Nimekiri</h1>
        </div>
        <div className="table-section">
            <div className="table-wrapper">
            <table className="table">
                <thead className="table-head">
                    <tr className="head-row">
                        <th className="table-heading">
                            <button onClick={() => sortByField("firstname")} className="sortable-header">
                                Eesnimi{" "}
                                {sortStates.firstname === "ascending" ? (
                                    <i className="fas fa-sort-down"></i>
                                ) : sortStates.firstname === "descending" ? (
                                    <i className="fas fa-sort-up"></i>
                                ) : (
                                    <i className="fas fa-sort"></i>
                                )}
                            </button>
                        </th>
                        <th className="table-heading">
                            <button onClick={() => sortByField("surname")} className="sortable-header">
                                Perekonnanimi{" "}
                                {sortStates.surname === "ascending" ? (
                                    <i className="fas fa-sort-down"></i>
                                ) : sortStates.surname === "descending" ? (
                                    <i className="fas fa-sort-up"></i>
                                ) : (
                                    <i className="fas fa-sort"></i>
                                )}
                            </button>
                        </th>
                        <th className="table-heading">
                            <button
                            onClick={() => sortByField("sex")}
                            className="sortable-header"
                            >
                                Sugu{" "}
                                {sortStates.sex === "ascending" ? (
                                    <i className="fas fa-sort-down"></i>
                                ) : sortStates.sex === "descending" ? (
                                    <i className="fas fa-sort-up"></i>
                                ) : (
                                    <i className="fas fa-sort"></i>
                                )}
                            </button>
                        </th>
                        <th className="table-heading">
                            <button onClick={() => sortByField("birthdate")} className="sortable-header">
                                Sünnikuupäev{" "}
                                {sortStates.birthdate === "ascending" ? (
                                    <i className="fas fa-sort-down"></i>
                                ) : sortStates.birthdate === "descending" ? (
                                    <i className="fas fa-sort-up"></i>
                                ) : (
                                    <i className="fas fa-sort"></i>
                                )}
                            </button>
                        </th>
                        <th
                        className="table-heading"
                        >
                        <button
                        className="sortable-header"
                        style={{cursor: "default"}}
                        >
                            Telefon
                        </button>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {currentRows.map((person, index) => (
                    <React.Fragment key={person.id}>
                        <tr 
                        key={index} onClick={() => toggleRow(person.id)}
                        className={`table-data-row ${openRows[person.id] ? "open-row" : ""}`}
                        >
                            <td className="table-data">{person.firstname}</td>
                            <td className="table-data">{person.surname}</td>
                            <td className="table-data">{getGender(person.personal_code)}</td>
                            <td className="table-data">{getBirthdate(person.personal_code)}</td>
                            <td className="table-data">{formatPhoneNumber(person.phone)}</td>
                        </tr>
                        {openRows[person.id] && (
                            <tr className="expanded-row">
                                <td colSpan="5" >
                                    <div className="expanded-div">
                                    <div>
                                        <img 
                                        src={person.image.large} style={{width: "200px", height: "200px", objectFit: "cover", margin: "6px"}}
                                        alt={person.image.alt}
                                        />
                                    </div>
                                
                                    <div className="expanded-text-div">
                                        
                                        <div
                                            dangerouslySetInnerHTML={{
                                                __html: person.body.split("\n") [0],
                                            }}
                                        />
                                    </div>
                                    </div>
                                </td>
                            </tr>
                            
                        )}
                    </React.Fragment>
                    ))}
                </tbody>
            </table>
                </div>
            <div className="pag-section">
                <div className="pag-div">
                    <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled = {currentPage === 1}
                    className="pag-button"
                    >
                    {"<"}
                    </button>

                    {getPageRange().map((page) => (
                        <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`pag-button ${page === currentPage ? "active" : ""}`}
                        >
                            {page}
                        </button>
                    ))}

                    <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled = {currentPage === Math.ceil(data.length / rowsPerPage)}
                    className="pag-button"
                    >
                    {">"}
                    </button>
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default Table