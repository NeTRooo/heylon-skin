let title = document.querySelector('.title')
if(title === null) {
    console.log(123);
}


const skinParts = ["head", "body", "rightArm", "leftArm", "rightLeg", "leftLeg"];
const skinLayers = ["innerLayer", "outerLayer"];
const availableAnimations = {
    idle: new skinview3d.IdleAnimation(),
    walk: new skinview3d.WalkingAnimation(),
    run: new skinview3d.RunningAnimation(),
    fly: new skinview3d.FlyingAnimation()
};

let skinViewer;

function reloadSkin() {
    const urlInput = document.getElementById('skin_url');
    const input = document.getElementById("skin_url");
    const fullUrl = 'https://minotar.net/skin/' + urlInput.textContent;
    if (fullUrl === "") {
        skinViewer.loadSkin(null);
        input.setCustomValidity("");
    } else {
        skinViewer.loadSkin(fullUrl, {
            model: "auto-detect",
            ears: "current_skin"
        })
            .then(() => input.setCustomValidity(""))
            .catch(e => {
                input.setCustomValidity("Image can't be loaded.");
                console.error(e);
            });
    }
}

function initializeViewer() {
    skinViewer = new skinview3d.SkinViewer({
        canvas: document.getElementById("skin_container")
    });

    skinViewer.width = 276;
    skinViewer.height = 368;
    skinViewer.fov = 70;
    skinViewer.zoom = 0.80;
    skinViewer.globalLight.intensity = 0.40;
    skinViewer.cameraLight.intensity = 0.60;
    skinViewer.autoRotate = false;
    skinViewer.autoRotateSpeed = 0.50;
    const animationName = "walk";
    if (animationName !== "") {
        skinViewer.animation = availableAnimations[animationName];
        skinViewer.animation.speed = 0.50;
    }
    skinViewer.controls.enableRotate = true
    skinViewer.controls.enableZoom = false;
    skinViewer.controls.enablePan = false;
    for (const part of skinParts) {
        for (const layer of skinLayers) {
            skinViewer.playerObject.skin[part][layer].visible = true;
        }
    }
    reloadSkin();
}

initializeViewer();