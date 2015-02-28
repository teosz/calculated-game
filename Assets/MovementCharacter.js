#pragma strict

var moveFront : KeyCode;
var moveBack : KeyCode;
var moveLeft : KeyCode;
var moveRight : KeyCode;
var moveToPoint : KeyCode; //not used
var moveToPointMouseButton : int = 1;

var targetPoint : Vector3;
var targetInWorld : Vector3;

var newMoveCommand : boolean = true;

var speed : float = 600;

var rotLeft : KeyCode;
var rotRight : KeyCode;
var rotSpeed : float = 600;

var target : Transform;
var cameraTr : Transform;

private var dir : Vector3;
private var POWER : float = 2;       //puterea functie folosite pentru a micsora viteza obiectului cand se apropie de tiinta
private var FRACTION : float = 0.24;  //fractie din raza , cand distanta < fractie*raza atunci viteza din mergi_in_fata_ = 0
private var MULTIFACTOR : float = 3;   //factorul cu care multiplic raza pentru a afla distanta de la care incep sa incetinesc


function look_at_cursor()
{
	var cursorPos : Vector3;
	cursorPos = Input.mousePosition;
	cursorPos.z = cameraTr.position.z;
	var worldPos : Vector3 = Camera.main.ScreenToWorldPoint(cursorPos);
	
	dir = worldPos - transform.position;
 	var angle = Mathf.Atan2(dir.y, dir.x) * Mathf.Rad2Deg - 90;
 	transform.rotation = Quaternion.AngleAxis(angle, Vector3.forward);
}

function classic_movement ()
{
	rigidbody2D.velocity = Vector2.zero;
	
	if (Input.GetKey(moveFront))
	{
		rigidbody2D.velocity.y = Time.deltaTime*speed;
		newMoveCommand = true;
	}
	else if (Input.GetKey(moveBack))
	{
		rigidbody2D.velocity.y = Time.deltaTime*speed *-1;
		newMoveCommand = true;
	}
	if (Input.GetKey(moveRight))
	{
		rigidbody2D.velocity.x = Time.deltaTime*speed;
		newMoveCommand = true;
	}
	else if (Input.GetKey(moveLeft))
	{
		rigidbody2D.velocity.x = Time.deltaTime*speed *-1;
		newMoveCommand = true;
	}
}

//not used
function modern_movement()
{
	rigidbody2D.velocity.x = 0;
	rigidbody2D.velocity.y = 0;
	var convertedAngle : float = (transform.eulerAngles.z+90)*Mathf.Deg2Rad;
	var thisCollider = GetComponent(CircleCollider2D);
	var exDiameter = thisCollider.radius*MULTIFACTOR; //it used to be just the diameter
	var distance : float;
	
	if (Input.GetKey(moveFront))
	{
		newMoveCommand = true;
		rigidbody2D.velocity.y += Time.deltaTime*Mathf.Sin(convertedAngle)*speed;
		rigidbody2D.velocity.x += Time.deltaTime*Mathf.Cos(convertedAngle)*speed;
		distance = Mathf.Sqrt(dir.y*dir.y + dir.x*dir.x);
		if (distance < exDiameter)
		{
			rigidbody2D.velocity.y *= Mathf.Pow(distance/exDiameter,POWER);
			rigidbody2D.velocity.x *= Mathf.Pow(distance/exDiameter,POWER);
		}
		if (distance < FRACTION*thisCollider.radius)
		{
			rigidbody2D.velocity.y *= 0;
			rigidbody2D.velocity.x *= 0;
		}
	}
	else if (Input.GetKey(moveBack))
	{
		rigidbody2D.velocity.y += Time.deltaTime*Mathf.Sin(convertedAngle)*speed*-1;
		rigidbody2D.velocity.x += Time.deltaTime*Mathf.Cos(convertedAngle)*speed*-1;
		newMoveCommand = true;
	}
	convertedAngle = (transform.eulerAngles.z)*Mathf.Deg2Rad;
	if (Input.GetKey(moveRight))
	{
		rigidbody2D.velocity.y += Time.deltaTime*Mathf.Sin(convertedAngle)*speed;
		rigidbody2D.velocity.x += Time.deltaTime*Mathf.Cos(convertedAngle)*speed;
		newMoveCommand = true;
	}
	else if (Input.GetKey(moveLeft))
	{
		rigidbody2D.velocity.y += Time.deltaTime*Mathf.Sin(convertedAngle)*speed*-1;
		rigidbody2D.velocity.x += Time.deltaTime*Mathf.Cos(convertedAngle)*speed*-1;
		newMoveCommand = true;
	}
}
//not used

function move_to_point(targetPoint : Vector3)
{
	var thisDir = targetPoint - transform.position;
	var angle = Mathf.Atan2(thisDir.y,thisDir.x);
	var thisCollider = GetComponent(CircleCollider2D);
	var exDiameter = thisCollider.radius*MULTIFACTOR;
	var distance : float;
	
	rigidbody2D.velocity.y = Time.deltaTime*Mathf.Sin(angle)*speed;
	rigidbody2D.velocity.x = Time.deltaTime*Mathf.Cos(angle)*speed;
	distance = Mathf.Sqrt(thisDir.y*thisDir.y + thisDir.x*thisDir.x);
	if (distance < exDiameter)
	{
		rigidbody2D.velocity.y *= Mathf.Pow(distance/exDiameter,POWER);
		rigidbody2D.velocity.x *= Mathf.Pow(distance/exDiameter,POWER);
	}
	if (distance < FRACTION*thisCollider.radius)
	{
		rigidbody2D.velocity.y *= 0;
		rigidbody2D.velocity.x *= 0;
	}
}

function rotate()
{ 
	if(Input.GetKey(rotLeft))
		transform.Rotate(0, 0, Time.deltaTime*rotSpeed);
	else if(Input.GetKey(rotRight))
		transform.Rotate(0, 0, Time.deltaTime*rotSpeed*-1);
}

function Start ()
{
	look_at_cursor();
}

function Update ()
{
	classic_movement();
	look_at_cursor();
	
	if(Input.GetMouseButton(moveToPointMouseButton))
	{
		newMoveCommand = false;
		targetPoint = Input.mousePosition;
		targetPoint.z = cameraTr.position.z;
		targetInWorld  = Camera.main.ScreenToWorldPoint(targetPoint);
	}
	
	if (!newMoveCommand)
	{
		move_to_point(targetInWorld);
	}
}