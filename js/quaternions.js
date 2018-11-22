class Quaternion {
    constructor(real, xi, yj, zk) {
        this.real = real;
        this.xi = xi;
        this.yj = yj;
        this.zk = zk;
    }

    conjugate() {
        return new Quaternion(this.real, this.xi*-1, this.yj*-1, this.zk*-1)
    }

    mult(other) {
        return new Quaternion(
            this.real*other.real - this.xi*other.xi - this.yj*other.yj - this.zk*other.zk,
            this.real*other.xi + this.xi*other.real + this.yj*other.zk - this.zk*other.yj,
            this.real*other.yj - this.xi*other.zk + this.yj*other.real + this.zk*other.xi,
            this.real*other.zk + this.xi*other.yj - this.yj*other.xi + this.zk*other.real
        )
    }
}

// extracts point from form and returns its quaternion representation
function get_point_quaternion() {
    // get point from form
    let point_x = parseFloat(document.getElementById('point_x').value);
    let point_y = parseFloat(document.getElementById('point_y').value);
    let point_z = parseFloat(document.getElementById('point_z').value);

    return new Quaternion(0, point_x, point_y, point_z)
}

// extracts rotation from form and returns its quaternion representation
function get_rotation_quaternion() {
    // convert angle to radians and divide by 2
    let angle = parseFloat(document.getElementById('angle').value);
    let radians = angle/360 * Math.PI;

    // get axis from form
    let axis_x = parseFloat(document.getElementById('axis_x').value);
    let axis_y = parseFloat(document.getElementById('axis_y').value);
    let axis_z = parseFloat(document.getElementById('axis_z').value);

    // normalize
    let length = Math.sqrt(Math.pow(axis_x, 2) + Math.pow(axis_y, 2) + Math.pow(axis_z, 2));
    let norm_x = axis_x / length;
    let norm_y = axis_y / length;
    let norm_z = axis_z / length;

    // only do this once
    sin_rad = Math.sin(radians);

    return new Quaternion(Math.cos(radians), sin_rad*norm_x, sin_rad*norm_y, sin_rad*norm_z)
}

// event handler to catch form submit and calculate rotation
function processForm(e) {
    if (e.preventDefault) e.preventDefault();

    let point = get_point_quaternion();
    console.log("Input Point:");
    console.log(point);


    let rotation = get_rotation_quaternion();
    console.log("Rotation Quaternion:");
    console.log(rotation);

    let rotated_point = rotation.mult(point).mult(rotation.conjugate());
    console.log("Rotated Point:");
    console.log(rotated_point);

    //set output fields
    document.getElementById('return_x').value = rotated_point.xi.toFixed(2);
    document.getElementById('return_y').value = rotated_point.yj.toFixed(2);
    document.getElementById('return_z').value = rotated_point.zk.toFixed(2);

    // You must return false to prevent the default form behavior
    return false;
}

// add event handler to form
var form = document.getElementById('form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}