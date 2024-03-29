import React from "react";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../App";
import TestTailwind from "../components/TestTailwind"
//@ts-ignore
import {createStore} from 'redux'
import allReducers from "../redux/reducers";
import '@testing-library/jest-dom'
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";

//@ts-ignore
const renderWithRouter = (ui, { route = "/" , initialState,
store = createStore(allReducers, initialState),} = {}) => {
  window.history.pushState({}, "Test page", route);
  return {
    user: userEvent.setup(),
    ...render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    ),
  };
};
test("renders welcome message", async () => {
  // const route = "/test_redux";
  // const route = "/test_tailwind";
  // const { getByText, asFragment } = renderWithRouter(<App />, { route,initialState:{} });

  render (

  <TestTailwind />

  )

  // const listNode = await waitFor(() =>
  //   getByText(/SIMPLE REDUX FUNCTIONALITY/i)
  // );
  expect(screen.getByText("Home")).toBeInTheDocument();
});

