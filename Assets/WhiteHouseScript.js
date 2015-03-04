#pragma strict

public static var LAYER : int = 3;

function Start ()
{
	var cursorPos : Vector3;
	cursorPos = Input.mousePosition;
	cursorPos.z = 30;
	var worldPos : Vector3 = Camera.main.ScreenToWorldPoint(cursorPos);	
	transform.position = worldPos;
}

function Update ()
{
	var cursorPos : Vector3;
	cursorPos = Input.mousePosition;
	cursorPos.z = LAYER;
	var worldPos : Vector3 = Camera.main.ScreenToWorldPoint(cursorPos);	
	transform.position = worldPos;
}
