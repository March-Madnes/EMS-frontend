import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Dash from "./Dash";
import { useAuth } from "../services/AuthContext";
import axios from "axios";
import { vi } from "vitest";

// Mock dependencies
vi.mock("../services/AuthContext");
vi.mock("axios");

vi.mock("../comp/EvidenceListing", () => () => (
  <div data-testid="evidence-listing">Mock Evidence Listing</div>
));

vi.mock("../comp/Footer", () => ({ Footer: () => <div data-testid="footer">Mock Footer</div> }));

vi.mock("../comp/Navv2", () => () => <div data-testid="navbar">Mock NavBar</div>);

describe("Dash Component", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      account: "0x123",
      disconnectMetaMask: vi.fn(),
      loading: false,
    });
  });

  it("renders the component with basic elements", () => {
    render(
      <MemoryRouter>
        <Dash />
      </MemoryRouter>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("File Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("File Description")).toBeInTheDocument();
    expect(screen.getByTestId("evidence-listing")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  it("shows error when trying to upload without a file", async () => {
    window.alert = vi.fn();

    render(
      <MemoryRouter>
        <Dash />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("File Name"), {
      target: { value: "Test File" },
    });
    fireEvent.change(screen.getByPlaceholderText("File Description"), {
      target: { value: "This is a test" },
    });

    fireEvent.click(screen.getByText("Upload File"));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Please select a file.");
    });
  });

  it("uploads file successfully", async () => {
    window.alert = vi.fn();
    axios.post.mockResolvedValue({ data: { IpfsHash: "QmTestHash" } });

    render(
      <MemoryRouter>
        <Dash />
      </MemoryRouter>
    );

    const file = new File(["dummy content"], "example.pdf", { type: "application/pdf" });

    const fileInput = screen.getByLabelText(/Click to upload/i).querySelector("input");

    fireEvent.change(fileInput, { target: { files: [file] } });
    fireEvent.change(screen.getByPlaceholderText("File Name"), {
      target: { value: "Test File" },
    });
    fireEvent.change(screen.getByPlaceholderText("File Description"), {
      target: { value: "This is a test file" },
    });

    fireEvent.click(screen.getByText("Upload File"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(window.alert).toHaveBeenCalledWith("Upload successful!");
    });
  });
});
