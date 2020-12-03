import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import {
  Card,
  Paper,
  CardHeader,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  IconButton,
} from '@material-ui/core';
import { Delete, ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getAllUsers } from '../../../reducer/users';

function UsersList(props) {
  const { getAllUsers } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Card style={{ color: 'white', padding: 0 }}>
      <CardHeader
        title="ok"
        style={{ backgroundColor: '#39424E', height: 32 }}
      />
      <CardContent>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left" width="10%"><b>STT</b></TableCell>
                <TableCell align="center"><b>Username</b></TableCell>
                <TableCell align="center"><b>Họ và tên</b></TableCell>
                <TableCell align="right" width="20%"><b>Tác vụ</b></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.usersList.slice(rowsPerPage * page, rowsPerPage * (page + 1)).map((user) => (
                <TableRow key={user.username}>
                  <TableCell align="left" width="10%">{user.id}</TableCell>
                  <TableCell align="center">{user.username}</TableCell>
                  <TableCell align="center">{user.fullname}</TableCell>
                  <TableCell align="right" width="20%">
                    <IconButton size="small">
                      <Delete fontSize="inherit" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5]}
              rowsPerPage={rowsPerPage}
              count={props.usersList.length}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
}

const mapStateToProps = (state) => ({
  usersList: select(state, 'usersReducer', 'usersList'),
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(toJs(UsersList));
