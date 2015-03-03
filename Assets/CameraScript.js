#pragma strict

var moveUp : KeyCode;
var moveDown : KeyCode;
var moveLeft : KeyCode;
var moveRight : KeyCode;

var lockKey : KeyCode;
var lookAtChar : KeyCode;

var locked : boolean = false;
var intermediate_position : Vector3;

var speed : float = 20;
var FRACTION : float = 0.95; // cand cursorul depaseste fractie*inaltimea_ecranului, camera merge in sus si pt jos (1-fractie)*inaltimea

var characterToFollow : Transform;
var map : SpriteRenderer;
var difference : Vector3;

private var max : Vector3;
private var min : Vector3;

function classic_movement ()
{	
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

function movement_final_form_01()
{
	if (Input.GetKey(moveUp)||Input.mousePosition.y > Screen.height * FRACTION)
		transform.Translate(Vector3.up*Time.deltaTime*speed,Space.World);
	if (Input.GetKey(moveDown)||Input.mousePosition.y < Screen.height * (1-FRACTION))
		transform.Translate(Vector3.down*Time.deltaTime*speed,Space.World);
	if(Input.GetKey(moveRight)||Input.mousePosition.x > Screen.width * FRACTION)
		transform.Translate(Vector3.right*Time.deltaTime*speed,Space.World);
	if(Input.GetKey(moveLeft)||Input.mousePosition.x < Screen.width * (1-FRACTION))
		transform.Translate(Vector3.left*Time.deltaTime*speed,Space.World);
}

function movement_final_form_02()
{
	if (Input.GetKey(moveUp)||Input.mousePosition.y > Screen.height * FRACTION)
		intermediate_position.y += speed*Time.deltaTime;
	if (Input.GetKey(moveDown)||Input.mousePosition.y < Screen.height * (1-FRACTION))
		intermediate_position.y += speed*Time.deltaTime*-1;
	if(Input.GetKey(moveRight)||Input.mousePosition.x > Screen.width * FRACTION)
		intermediate_position.x += speed*Time.deltaTime;
	if(Input.GetKey(moveLeft)||Input.mousePosition.x < Screen.width * (1-FRACTION))
		intermediate_position.x += speed*Time.deltaTime*-1;
}

function Start ()
{
	var vertExtent = Camera.main.camera.orthographicSize;    
    var horzExtent = vertExtent * Screen.width / Screen.height;
    
    // Calculations assume map is position at the origin
    min.x = horzExtent - map.sprite.bounds.extents.x;
    max.x = map.sprite.bounds.extents.x - horzExtent;
    min.y = vertExtent - map.sprite.bounds.extents.y;
    max.y = map.sprite.bounds.extents.y - vertExtent;
    
    Debug.Log(vertExtent);  
    Debug.Log(horzExtent);
    
    Debug.Log(map.sprite.bounds.extents.y);
    Debug.Log(map.sprite.bounds.extents.x);
    
    Debug.Log(max);
    Debug.Log(min);
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
		intermediate_position = characterToFollow.position + difference;
	}
	else
	{
		movement_final_form_02();
	}
	if(Input.GetKey(lookAtChar))
	{
		difference = Vector3.zero;
		difference.z = transform.position.z - characterToFollow.position.z;
		intermediate_position = characterToFollow.position + difference;
	}
	transform.position.x = Mathf.Clamp(intermediate_position.x, min.x, max.x);
	transform.position.y = Mathf.Clamp(intermediate_position.y, min.y, max.y);
}