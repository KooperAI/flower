import React, { createRef, ReactElement } from 'react';
import {
  World,
  Engine,
  Render,
  Bodies,
  Mouse,
  MouseConstraint,
  Body,
  Composites,
  Composite,
} from 'matter-js';

const Game: React.FC = (): ReactElement => {
  const [angleValue, setAngleValue] = React.useState(45);
  const scene: React.RefObject<HTMLDivElement> = React.createRef();
  const initialize = (): void => {
    const engine = Engine.create();
    const render = Render.create({
      element: scene.current as HTMLElement,
      engine: engine,
    });
    const ground: Body = Bodies.rectangle(400, 600, 810, 60, {
      isStatic: true,
    });
    const pendulum = Composites.newtonsCradle(400, 0, 5, 20, 200);
    pendulum.bodies.forEach((body) => {
      body.frictionAir = 0;
      body.mass = 10;
    });
    Body.applyForce(
      pendulum.bodies[0],
      { x: pendulum.bodies[0].position.x, y: pendulum.bodies[0].position.y },
      { x: 0.05, y: 0 },
    );
    World.addComposite(engine.world, pendulum);
    World.add(engine.world, [ground]);
    Engine.run(engine);
    Render.run(render);
  };

  const changeAngleValue = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    event.preventDefault();
    let proposed_value = parseFloat(event.target.value);
    proposed_value = Math.min(parseFloat(event.target.max), proposed_value);
    proposed_value = Math.max(parseFloat(event.target.min), proposed_value);
    event.target.value = proposed_value.toString();
    setAngleValue(proposed_value);
  };

  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <>
      <div className="row">
        <div ref={scene} />
      </div>
      <div className="row">
        <div className="button-zone">
          <form>
            <div className="form-group col-xs-6">
              <label>Angle</label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="90"
                step="1"
                value={angleValue}
                onChange={changeAngleValue}
                id="angleRange"
              />
              <input
                type="number"
                className="form-control"
                min="0"
                max="90"
                step="1"
                value={angleValue}
                onChange={changeAngleValue}
                id="angleInput"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Game;
