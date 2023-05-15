import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {createReducer, on} from '@ngrx/store';
import * as MechanicActions from './mechanic.actions';
import {Mechanic} from './mechanic.entity';

export interface MechanicState extends EntityState<Partial<Mechanic>> {
  loading: boolean;
}

export const adapter: EntityAdapter<Partial<Mechanic>> = createEntityAdapter<Mechanic>({
  selectId: (mechanic: Mechanic) => mechanic.id,
});

export const initialMechanicState: MechanicState = adapter.getInitialState({
  loading: false,
});

export const mechanicReducer = createReducer(
  initialMechanicState,
  on(
    MechanicActions.loadMechanicRequest,
    MechanicActions.createMechanicRequest, state => ({...state, loading: true})),
  on(
    MechanicActions.mechanicError, state => ({...state, loading: false})),
  on(
    MechanicActions.loadMechanics,
    (state, action) => {
      return adapter.upsertMany(action.mechanics, {...state, loading: false});
    }),
  on(
    MechanicActions.loadCreatedMechanic,
    MechanicActions.loadEditedMechanic,
    (state, action) => {
      return adapter.upsertOne(action.mechanic, {...state, loading: false});
    }),
);

export const {
  selectAll,
  selectTotal,
} = adapter.getSelectors();

