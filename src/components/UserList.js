import UserItem from './UserItem';

function UserList({ userList }) {

    const renderUsers = () => {
        return userList.map((eachUser) => {
            return <UserItem key={eachUser.id} eachUser={eachUser} />
        });
    }

    return (
        <>
            <ul>{renderUsers()}</ul>
        </>
    );
}

export default UserList;