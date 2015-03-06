#pragma strict

public static var LAYER : int = 3;

public var underneath : Collider2D;

private var RED : Color = Color(0.8,0.2,0.2,0.75); //de revizuit culorile
private var GREEN : Color = Color(0.2,0.8,0.2,0.75);

function Start ()
{
	var cursorPos : Vector3;
	cursorPos = Input.mousePosition;
	cursorPos.z = 30;
	var worldPos : Vector3 = Camera.main.ScreenToWorldPoint(cursorPos);	
	transform.position = worldPos;
}

var myRenderer : SpriteRenderer;// in loc sa ia date de la obiectul actual ia de la prefab

function Update ()
{
	var cursorPos : Vector3;
	cursorPos = Input.mousePosition;
	cursorPos.z = LAYER;
	var worldPos : Vector3 = Camera.main.ScreenToWorldPoint(cursorPos);	
	transform.position = worldPos;
	
	
	var pointA : Vector2;
	pointA.x = transform.position.x - myRenderer.sprite.bounds.extents.x;
	pointA.y = transform.position.y - myRenderer.sprite.bounds.extents.y;
	
	var pointB : Vector2;
	pointB.x = transform.position.x + myRenderer.sprite.bounds.extents.x;
	pointB.y = transform.position.y + myRenderer.sprite.bounds.extents.y;
	
	underneath = Physics2D.OverlapArea(pointA, pointB); //pune si celelalte variabile
	
	if(underneath)
		myRenderer.color = RED;
	else
		myRenderer.color = GREEN;
	
}
