import * as React from 'react';

function SideNav(props: any) {
  return (
    <nav className="SideNav">
      <br/>
      <table className="nav-vertical">
        <thead>
          <tr>
            <th>Files</th>
            <th>Upload</th>
            <th><a href="#" onClick={props.resetFiles}>Delete</a></th>
          </tr>
        </thead>
        <tbody>
          {
          props.files.map((f: any) =>
            <tr key={f.name}>
              <td><a href="#"
                onClick={props.selectFile.bind(props.container, f.name)}>
                {f.name}
              </a></td>
              <td><a href="#"
                onClick={props.uploadFile.bind(props.container, f.name)}>
                <img src={window.location.origin + "/resources/icons/upload.png"}/>
              </a></td>
              <td><a href="#"
                onClick={props.deleteFile.bind(props.container, f.name)}>
                <img src={window.location.origin + "/resources/icons/delete.png"}/>
              </a></td>
            </tr>)
          }
        </tbody>
      </table>
    </nav>
  );
}

export default SideNav;
