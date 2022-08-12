import React from 'react'
import { styled } from '@mui/material/styles';
import { BiSearchAlt } from 'react-icons/bi'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { BsChevronRight } from 'react-icons/bs'
import Link from 'next/link';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
    paddingLeft: '50px',
    paddingRight: '50px',
    textAlign: 'center',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    paddingLeft: '50px',
    paddingRight: '50px',
    textAlign: 'center',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, score, status, notification ) {
  return { name, score, status, notification };
}



const rows = [
  createData('Projet naze', 50, 'Incomplet', 0),
  createData('Projet ok', 260, 'En cours', 1),
  createData('Bon projet', 550, 'Terminé', 0),
  createData('Très bon projet', 700, 'Certifié', 0),
];

const MesProjets = () => {
  return (
    <>
      <div className='flex items-center justify-between mt-10 lg:mt-16 '>
        <div className='relative'>
          <h1 className='text-xl font-bold md:text-2xl lg:text-3xl underline'>Mes projets</h1>
          <span className="bg-red-900 text-white w-fit mx-auto px-3 py-1 rounded-full absolute bottom-0 -left-9 font-bold">1</span>
        </div>
        <div className='relative w-1/2 max-w-[550px]'>
          <input type='text' placeholder='Rechercher un projet' className='border-2 border-black w-full  rounded-md p-2' />
          <BiSearchAlt className='text-2xl lg:text-3xl absolute top-3 right-3 lg:top-2 lg:right-4 cursor-pointer' />
        </div>
      </div>
      <div className='mt-14'>
        <CustomizedTables />
      </div>
      <Link href='/profile/projets/create-project'>
        <div className='flex justify-end mt-8'>
          <button className='flex justify-end p-2 rounded-md border border-black hover:bg-blue-400/40'>Créer un projet</button>
        </div>
      </Link>
    </>
  )
}

function CustomizedTables() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1000 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Nom du projet</StyledTableCell>
            <StyledTableCell>Score</StyledTableCell>
            <StyledTableCell>Status</StyledTableCell>
            <StyledTableCell>Notifications</StyledTableCell>
            <StyledTableCell>Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            
            <StyledTableRow key={row.name}>
              <StyledTableCell sx={{ width: 300 }} component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell>{row.score}</StyledTableCell>
              <StyledTableCell>{row.status}</StyledTableCell>
              {row.notification === 1 ? (
                <StyledTableCell>
                  <div className="bg-red-900 text-white w-fit mx-auto px-4 py-2 rounded-full">
                    {row.notification}
                  </div>
                </StyledTableCell>
              ) : (
                <StyledTableCell>
                  {row.notification}
                </StyledTableCell>

              )}
              <StyledTableCell>
                <Link href='/profile/projets/offres'>
                  <div className='flex items-center gap-x-4 cursor-pointer'>
                    <div className='flex w-fit items-center bg-black px-4 py-2 rounded-md'>
                      <span className='text-white'>Actions</span>
                      <BsChevronRight className='text-lg ml-2 text-white' />
                    </div>
                  </div>
                </Link>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default MesProjets