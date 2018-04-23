/**
 * Npm import
 */
import { connect } from 'react-redux';

/**
 * Local import
 */
import Example from 'src/components/Example';

// Action Creators
import { doSomething } from 'src/store/reducer';

/**
 * Code
 */
// State
// mapStateToProps met à dispo (state, ownProps)
// rien envoyer >> const mapStateToProps = null;
const mapStateToProps = (state, ownProps) => ({
  message: state.message,
});

// Actions
// mapDispatchToProps met à dispo (dispatch, ownProps)
// rien envoyer >> const mapDispatchToProps = {};
const mapDispatchToProps = (dispatch, ownProps) => ({
  doSomething: () => {
    dispatch(doSomething());
  },
});

// Container
const ExampleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Example);

/* 2 temps
const createContainer = connect(mapStateToProps, mapDispatchToProps);
const ExampleContainer = createContainer(Example);
*/

/**
 * Export
 */
export default ExampleContainer;
