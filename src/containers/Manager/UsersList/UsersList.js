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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab'; 
import { Delete, Add } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getAllUsers } from '../../../reducer/users';

import DeleteUserModal from '../DeleteUserModal';

function UsersList(props) {
  const { getAllUsers } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deletedUser, setDeletedUser] = useState(null);

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
    <>
      <Card style={{ color: 'white', padding: 0 }}>
        <CardHeader
          title="Danh sách người dùng"
          style={{ backgroundColor: '#39424E', height: 32 }}
        />
        <CardContent>
          <TableContainer component={Paper} style={{ marginTop: 12 }}>
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
                      <IconButton size="small" onClick={() => setDeletedUser(user)}>
                        <Delete fontSize="inherit" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    style={{ height: 35, margin: '10px 16px', minWidth: 150 }}
                  >
                    Thêm mới
                  </Button>
                  <TablePagination
                    rowsPerPageOptions={[5]}
                    rowsPerPage={rowsPerPage}
                    count={props.usersList.length}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />  
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <DeleteUserModal deletedUser={deletedUser} setDeletedUser={setDeletedUser} />
    </>
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
