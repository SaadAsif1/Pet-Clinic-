// Pet objects
class Pet {
  constructor(fullName, petType, id, checkUp, doctor) {
    this.fullName = fullName;
    this.petType = petType;
    this.id = id;
    this.checkUp = checkUp;
    this.doctor = doctor;
  }
}

// UI Methds
class UI {
  createElement(check) {
    const tBody = document.querySelector('#table-b');
    const tr = document.createElement('tr');
    tr.className = 'table-r';
    tr.innerHTML = `
    <td id="name" class="ca" >${check.fullName}</td>
    <td class="ca" >${check.petType}</td>
    <td>#${check.id}</td>
    <td>${check.checkUp}</td>
    <td>${check.doctor}</td>
    <td><i class="fas fa-user-times"></i></td>
    `;
    tBody.appendChild(tr);
  }

  alert(message, clas, outline, time) {
    const div = document.createElement('div');
    div.id = 'alert';
    div.innerHTML = `<p class="${clas}">${message}</p>`;

    const border = document.querySelectorAll('.border');
    border.forEach(function(cur) {
      cur.style.border = outline;
    });

    const top = document.querySelector('#top-t');
    const header = document.querySelector('.header');
    top.insertBefore(div, header);

    setTimeout(function() {
      border.forEach(function(cur) {
        cur.style.border = '1px solid lightgrey';
      });
      div.remove();
    }, time);
  }

  filterList(check) {
    document.querySelector('#filter').addEventListener('keyup', function(e) {
      const id = e.target.value.toLowerCase();
      const tr = document.querySelectorAll('.table-r').forEach(function(cur) {
        const table = cur.children[2];
        if (table.textContent.toLowerCase().indexOf(id) === -1) {
          cur.style.display = 'none';
        } else {
          cur.style.display = '';
        }
      });
    });
  }

  clearValues() {
    const fullName = (document.querySelector('#full-name').value = '');
    const petType = (document.querySelector('#pet-type').value = '');
    const id = (document.querySelector('#id').value = '');
    const checkUp = (document.querySelector('#date').value = '');
  }
}

class Persistls {
  static initls() {
    let check;
    if (localStorage.getItem('user') === null) {
      check = [];
    } else {
      check = JSON.parse(localStorage.getItem('user'));
    }
    return check;
  }

  static addls(checks) {
    const check = Persistls.initls();
    check.push(checks);
    localStorage.setItem('user', JSON.stringify(check));
  }

  static displaychecks(checks) {
    const check = Persistls.initls();
    check.forEach(function(cur) {
      const ui = new UI();
      ui.createElement(cur);
    });
  }

  static deltes(id) {
    const check = Persistls.initls();
    check.forEach(function(cur, index) {
      if (cur.id === id) {
        check.splice(index, 1);
      }
    });
    localStorage.setItem('user', JSON.stringify(check));
  }
}

class Back {
  static backGround() {
    const tr = document.querySelectorAll('.table-r:nth-child(odd)');
    tr.forEach(function(cur) {
      cur.style.background = '#f4f4f4';
    });
  }
}

// Add Event listiner to Button
document.querySelector('#submit').addEventListener('click', function(e) {
  const fullName = document.querySelector('#full-name').value;
  const petType = document.querySelector('#pet-type').value;
  const id = document.querySelector('#id').value;
  const checkUp = document.querySelector('#date').value;
  const doctor = document.querySelector('#select').value;

  const check = new Pet(fullName, petType, id, checkUp, doctor);

  const ui = new UI();

  if (fullName === '' || petType === '' || id === '' || checkUp === '' || doctor === '') {
    ui.alert('Please Fill all input forms', 'bad', '1px solid red', 2000);
  } else {
    ui.createElement(check);
    ui.alert('User Sucessfuly Added', 'good', '1px solid lightgrey', 2000);
    ui.clearValues();
    Persistls.addls(check);
  }
  Back.backGround();
  ui.filterList(check);
  e.preventDefault();
});

// on dom reload
document.addEventListener('DOMContentLoaded', function(e) {
  const ui = new UI();
  const fullName = document.querySelector('#full-name').value;
  const petType = document.querySelector('#pet-type').value;
  const id = document.querySelector('#id').value;
  const checkUp = document.querySelector('#date').value;
  const doctor = document.querySelector('#select').value;
  const check = new Pet(fullName, petType, id, checkUp, doctor);
  Persistls.displaychecks(check);
  ui.filterList(check);
  Back.backGround();
});
// const ui = new UI();
// ui.filterList(check);
// Back.backGround();

// delte
document.querySelector('#table-b').addEventListener('click', function(e) {
  if (e.target.className.includes('fas fa-user-times')) {
    const ui = new UI();
    e.target.parentElement.parentElement.remove();
    ui.alert('User Sucessfuly Deleted', 'good', '1px solid lightgrey', 2000);
    const length = e.target.parentElement.parentElement.children[2].textContent.length;
    Persistls.deltes(
      e.target.parentElement.parentElement.children[2].textContent.substr(1, length)
    );
  }
  e.preventDefault();
});
