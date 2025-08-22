// src/Login.js
import React, { useState } from "react";
import {
  Paper, Box, Stack, Typography, TextField, Button,
  Alert, InputAdornment
} from "@mui/material";
import { Person, Lock } from "@mui/icons-material";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const k = Object.keys(data)[0];
        const text = k ? `${k}: ${Array.isArray(data[k]) ? data[k] : data[k]}` : "Login failed";
        setMsg({ type: "error", text });
      } else {
        setMsg({ type: "success", text: "Welcome back!" });
      }
    } catch {
      setMsg({ type: "error", text: "Network error. Is backend running?" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4" fontWeight={700} textAlign="center">
          Login
        </Typography>

        {msg.text && <Alert severity={msg.type}>{msg.text}</Alert>}

        <Box component="form" onSubmit={submit} noValidate>
          <Stack spacing={2}>
            <TextField
              label="Username"
              name="username"
              value={form.username}
              onChange={onChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              required
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ textTransform: "none", py: 1.2 }}
            >
              {loading ? "Signing in..." : "Login"}
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Paper>
  );
}
