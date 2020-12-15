import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  Fab,
  Link,
  Paper,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
} from '@material-ui/core';
import { Delete, Add } from '@material-ui/icons';

import toJs from '../../../hoc/ToJS';
import select from '../../../utils/select';
import ROUTER from '../../../constant/router';

import { getAllUsers } from '../../../reducer/users';

import InsertUserModal from '../InsertUserModal';
import DeleteUserModal from '../DeleteUserModal';

function UsersList(props) {
  const history = useHistory();
  const { getAllUsers } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [isInserting, setInserting] = useState(false);
  const [deletedUser, setDeletedUser] = useState(null);

  const isAdmin = localStorage.getItem("isAdmin") === 'true';
  if (!isAdmin) history.push(ROUTER.ERROR);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Card style={{ color: 'white', padding: 0 }}>
        <CardHeader title="Danh sách người dùng" style={{ backgroundColor: '#39424E' }} />
        <CardContent>
          <TableContainer component={Paper} style={{ marginTop: 12, position: 'relative' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center"><b>STT</b></TableCell>
                  <TableCell align="center"><b>Username</b></TableCell>
                  <TableCell align="center"><b>Họ và tên</b></TableCell>
                  <TableCell align="center"><b>Tác vụ</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {props.usersList.sort((a, b) => a.id - b.id).slice(rowsPerPage * page, rowsPerPage * (page + 1)).map((user) => (
                  <TableRow key={user.username}>
                    <TableCell align="center">{user.id}</TableCell>
                    <TableCell align="center"><Link href={`${ROUTER.USER}/${user.id}`}>{user.username}</Link></TableCell>
                    <TableCell align="center"><Link href={`${ROUTER.USER}/${user.id}`}>{user.fullname}</Link></TableCell>
                    <TableCell align="center">
                      <IconButton size="small" onClick={() => setDeletedUser(user)}><Delete fontSize="inherit" /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TablePagination
                    page={page}
                    rowsPerPageOptions={[5]}
                    rowsPerPage={rowsPerPage}
                    count={props.usersList.length}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                  />  
                </TableRow>
              </TableBody>
            </Table>
            <Fab
              className="fab-quiz-element"
              onClick={() => setInserting(true)}
              style={{
                top: 'auto',
                left: 8,
                bottom: 8,
                padding: 7,
                width: 'auto',
                height: 'auto',
                borderRadius: 0,
                border: '1px solid #d4d4d4'
              }}
            >
              <Add />
              Thêm mới
            </Fab>
          </TableContainer>
        </CardContent>
      </Card>

      <InsertUserModal isInserting={isInserting} setInserting={setInserting} />
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
