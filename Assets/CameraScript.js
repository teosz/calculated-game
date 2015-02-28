#pragma strict

var moveUp : KeyCode;
var moveDown : KeyCode;
var moveLeft : KeyCode;
var moveRight : KeyCode;

var lockKey : KeyCode;
var lookAtChar : KeyCode;

var locked : boolean = false;

var speed : float = 20;
var FRACTION : float = 0.95; // cand cursorul depaseste fractie*inaltimea_ecranului, camera merge in sus si pt jos (1-fractie)*inaltimea

var characterToFollow : Transform;
var difference : Vector3;

function classic_movement ()
{
	rigidbody2D.velocity = Vector2.zero;
	
	if (Input.GetKey(moveUp))
	{
		transform.Translate(Vector3.up*Time.deltaTime*speed,Space.World);
	}
	else if (Input.GetKey(moveDown))
	{
		transform.Translate(Vector3.down*Time.deltaTime*speed,Space.World);
	}
	if (Input.GetKey(moveRight))
	{
		transform.Translate(Vector3.right*Time.deltaTime*speed,Space.World);
	}
	else if (Input.GetKey(moveLeft))
	{
		transform.Translate(Vector3.left*Time.deltaTime*speed,Space.World);
	}
}

function moving_with_cursor_at_edge()
{
	if(Input.mousePosition.y > Screen.height * FRACTION)
		transform.Translate(Vector3.up*Time.deltaTime*speed,Space.World);
	else if(Input.mousePosition.y < Screen.height * (1-FRACTION))
		transform.Translate(Vector3.down*Time.deltaTime*speed,Space.World);
	if(Input.mousePosition.x > Screen.width * FRACTION)
		transform.Translate(Vector3.right*Time.deltaTime*speed,Space.World);
	else if(Input.mousePosition.x < Screen.width * (1-FRACTION))
		transform.Translate(Vector3.left*Time.deltaTime*speed,Space.World);
}

function Start ()
{
	transform.Translate(Vector3.left*Time.deltaTime*speed,Space.World);
}

function Update ()
{
	if(Input.GetKeyDown(lockKey))
	{
		if(locked)
		{
			locked = false;
		}
		else
		{
			locked = true;
			difference = transform.position - characterToFollow.position;
		}
	}
	if(locked)
	{
		transform.position = characterToFollow.position + difference;
	}
	else
	{
		classic_movement();
		moving_with_cursor_at_edge();
	}
	if(Input.GetKey(lookAtChar))
	{
		difference = Vector3.zero;
		difference.z = transform.position.z - characterToFollow.position.z;
		transform.position = characterToFollow.position + difference;
	}
}