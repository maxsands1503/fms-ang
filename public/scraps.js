


    <!-- <ul id="list">

    </ul>
    <script type="text/javascript">

      const obj = document.getElementById('object');
      const dbref = firebase.database().ref().child('obj');
      dbref.on('value', snap =>{
        obj.innerText = JSON.stringify(snap.val(), null, 3)
      }
    );
    const ulist = document.getElementById('list');
    const dbreflist = dbref.child('hobbies');
    dbreflist.on('child_added', snap => {
      const li = document.createElement('p');
      li.innerText = snap.val();
      li.id = snap.key;
      ulist.appendChild(li);
    });
      dbreflist.on('child_changed', snap => {
        const liChanged = document.getElementById(snap.key);
        liChanged.innerText = snap.val();
      });


      dbreflist.on('child_removed', snap => {
        const liRemoved = document.getElementById(snap.key);
        liRemoved.remove();
      });
    </script> -->
